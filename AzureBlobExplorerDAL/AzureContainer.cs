using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AzureBlobExplorerDAL.Helpers;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorerDAL
{
    public class AzureContainer : AzureBlob
    {
        public readonly CloudBlobContainer CloudBlobContainer;

        public AzureContainer(string containerName) : base()
        {
            CloudBlobContainer = CloudBlobClient.GetContainerReference(containerName);
        }

        public async Task CreateContainerIfNotExists() => await CloudBlobContainer.CreateIfNotExistsAsync();
    }
}
