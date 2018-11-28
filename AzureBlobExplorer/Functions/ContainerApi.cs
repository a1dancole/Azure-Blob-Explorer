using System;
using System.IO;
using System.Threading.Tasks;
using AzureBlobExplorer.Mappers;
using AzureBlobExplorerDAL.Creator;
using AzureBlobExplorerDAL.Deleter;
using AzureBlobExplorerDAL.Retriever;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace AzureBlobExplorer.Functions
{
    public static class ContainerApi
    {
        [FunctionName("GetAllContainers")]
        public static async Task<IActionResult> GetAllContainers(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpGet, Route = "GetAllContainers")] HttpRequest request,
            ILogger log)
        {
            var containerRetriever = new AzureContainerRetriever();
            var response = await containerRetriever.GetAllContainers();
            return new OkObjectResult(response.ToContainerDetails());
        }

        [FunctionName("CreateContainer")]
        public static async Task<IActionResult> CreateContainer(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpPost, Route = "CreateContainer/{containerName}")]
            HttpRequest request,
            ILogger logger,
            string containerName)
        {
            var creator = await AzureContainerCreator.InitializeAsync();
            return new OkObjectResult(await creator.CreateContainer(containerName.ToLower()));
        }

        [FunctionName("DeleteContainer")]
        public static async Task<IActionResult> DeleteContainer(
            [HttpTrigger(AuthorizationLevel.System, Constants.Constants.HttpDelete, Route = "DeleteContainer/{containerName}")]
            HttpRequest request,
            ILogger logger,
            string containerName)
        {
            var deleter = await AzureContainerDeleter.InitializeAsync(containerName);
            return new OkObjectResult(await deleter.DeleteContainer());
        }
    }
}
