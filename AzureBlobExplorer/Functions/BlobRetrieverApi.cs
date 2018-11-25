using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using AzureBlobExplorer.Constants;
using AzureBlobExplorer.Dtos;
using AzureBlobExplorer.Mappers;
using AzureBlobExplorerDAL.Creator;
using AzureBlobExplorerDAL.Deleter;
using AzureBlobExplorerDAL.Retriever;
using Microsoft.AspNetCore.WebUtilities;

namespace AzureBlobExplorer.Functions
{
    public static class BlobRetrieverApi
    {
        [FunctionName("GetAllBlobs")]
        public static async Task<IActionResult> GetAllBlobs(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "GetAllBlobs")] HttpRequest request,
            ILogger logger)
        {
            var blobRetriever =
                await AzureBlobRetriever.InitializeAsync();

            var response = await blobRetriever.GetAllBlobs();

            return new OkObjectResult(response.ToBlobDetails());
        }

        [FunctionName("GetBlob")]
        public static async Task<IActionResult> GetBlob(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "GetBlob/{blobName}")] HttpRequest request,
            ILogger logger,
            string blobName)
        {
            var blobRetriever =
                await AzureBlobRetriever.InitializeAsync();

            return new OkObjectResult(await blobRetriever.GetBlob(blobName));
        }

        [FunctionName("GetBlobAsStream")]
        public static async Task<IActionResult> DownloadBlobInline(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "DownloadBlobInline/{blobName}")] HttpRequest request,
            ILogger logger,
            string blobName
            )
        {
            var blobRetriever =
                await AzureBlobRetriever.InitializeAsync();

            var stream = await blobRetriever.GetBlobAsStream(blobName);

            return new FileStreamResult(stream, MimeTypes.GetMimeType(blobName));
        }

        [FunctionName("DownloadBlob")]
        public static async Task<FileResult> DownloadBlob(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "DownloadBlob/{blobName}")]
            HttpRequest request,
            ILogger logger,
            string blobName)
        {
            var blobRetriever = await AzureBlobRetriever.InitializeAsync();

            using (var ms = new MemoryStream())
            {
                var stream = await blobRetriever.GetBlobAsStream(blobName);
                await stream.CopyToAsync(ms);
                return new FileContentResult(ms.ToArray(), MediaTypeNames.Application.Octet)
                {
                    FileDownloadName = blobName
                };
            }
        }

        [FunctionName("DeleteBlob")]
        public static async Task<IActionResult> DeleteBlob(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpDelete, Route = "DeleteBlob/{blobName}")]
            HttpRequest request,
            ILogger logger,
            string blobName)
        {
            try
            {
                var blobDeleter = await AzureBlobDeleter.InitializeAsync();
                await blobDeleter.DeleteBlob(blobName);

                return new OkResult();
            }
            catch (Exception e)
            {
                return new ExceptionResult(e, true);
            }
        }

        [FunctionName("CreateBlob")]
        public static async Task<IActionResult> CreateBlob(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpPost, Route = "CreateBlob")]
            HttpRequest request,
            ILogger logger)
        {
            var formData = await request.ReadFormAsync();
            var file = formData?.Files?.FirstOrDefault();
            if (file == null)
            {
                return new BadRequestObjectResult("No file in form data");
            }
            var blobCreator = await AzureBlobCreator.InitializeAsync();
            var response = await blobCreator.CreateBlob(file.OpenReadStream(), file.FileName, file.ContentType);

            return new OkObjectResult(response);

        }
    }
}
