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
    public static class BlobApi
    {
        [FunctionName("GetAllBlobs")]
        public static async Task<IActionResult> GetAllBlobs(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "GetAllBlobs/{containerName}")] HttpRequest request,
            ILogger logger,
            string containerName)
        {
            var blobRetriever =
                await AzureBlobRetriever.InitializeAsync(containerName);

            var response = await blobRetriever.GetAllBlobs();

            return new OkObjectResult(response.ToBlobDetails());
        }

        [FunctionName("GetBlob")]
        public static async Task<IActionResult> GetBlob(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "GetBlob/{containerName}/{blobName}")] HttpRequest request,
            ILogger logger,
            string containerName,
            string blobName)
        {
            var blobRetriever =
                await AzureBlobRetriever.InitializeAsync(containerName);

            return new OkObjectResult(await blobRetriever.GetBlob(blobName));
        }

        [FunctionName("GetBlobAsStream")]
        public static async Task<IActionResult> DownloadBlobInline(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "DownloadBlobInline/{containerName}/{blobName}")] HttpRequest request,
            ILogger logger,
            string containerName,
            string blobName
            )
        {
            var blobRetriever =
                await AzureBlobRetriever.InitializeAsync(containerName);

            var stream = await blobRetriever.GetBlobAsStream(blobName);

            return new FileStreamResult(stream, MimeTypes.GetMimeType(blobName));
        }

        [FunctionName("DownloadBlob")]
        public static async Task<FileResult> DownloadBlob(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "DownloadBlob/{containerName}/{blobName}")]
            HttpRequest request,
            ILogger logger,
            string containerName,
            string blobName)
        {
            var blobRetriever = await AzureBlobRetriever.InitializeAsync(containerName);

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
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpDelete, Route = "DeleteBlob/{containerName}/{blobName}")]
            HttpRequest request,
            ILogger logger,
            string containerName,
            string blobName)
        {
            try
            {
                var blobDeleter = await AzureBlobDeleter.InitializeAsync(containerName);
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
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpPost, Route = "CreateBlob/{containerName}")]
            HttpRequest request,
            ILogger logger,
            string containerName)
        {
            var formData = await request.ReadFormAsync();
            var file = formData?.Files?.FirstOrDefault();
            if (file == null)
            {
                return new BadRequestObjectResult("No file in form data");
            }
            var blobCreator = await AzureBlobCreator.InitializeAsync(containerName);
            var response = await blobCreator.CreateBlob(file.OpenReadStream(), file.FileName, file.ContentType);

            return new OkObjectResult(response);

        }
    }
}
