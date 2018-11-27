using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzureBlobExplorerDAL.Deleter
{
    public class AzureBlobDeleter : AzureContainer
    {

        public static async Task<AzureBlobDeleter> InitializeAsync(string containerName)
        {
            var response = new AzureBlobDeleter(containerName);
            await response.CreateContainerIfNotExists();
            return response;
        }

        public async Task DeleteBlob(string blobName)
        {
            var blob = await CloudBlobContainer.GetBlobReferenceFromServerAsync(blobName);
            await blob.DeleteAsync();
        }

        private AzureBlobDeleter(string containerName) : base(containerName) { }
    }
}
