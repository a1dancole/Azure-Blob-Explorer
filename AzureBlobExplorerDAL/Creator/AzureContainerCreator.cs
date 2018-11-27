using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorerDAL.Creator
{
    public class AzureContainerCreator : AzureBlob
    {
        public static async Task<AzureContainerCreator> InitializeAsync()
        {
            var response = new AzureContainerCreator();
            return response;
        }

        public async Task<bool> CreateContainer(string containerName) => await CloudBlobClient.GetContainerReference(containerName).CreateIfNotExistsAsync(BlobContainerPublicAccessType.Container, new BlobRequestOptions(), new OperationContext());
        
        private AzureContainerCreator() : base() { }
    }
}
