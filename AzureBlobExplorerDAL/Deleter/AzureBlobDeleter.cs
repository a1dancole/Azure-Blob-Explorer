using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzureBlobExplorerDAL.Deleter
{
    public class AzureBlobDeleter : AzureBlob
    {

        public static async Task<AzureBlobDeleter> InitializeAsync()
        {
            var response = new AzureBlobDeleter();
            await response.CreateContainerIfNotExists();
            return response;
        }

        public async Task DeleteBlob(string blobName)
        {
            var blob = await CloudBlobContainer.GetBlobReferenceFromServerAsync(blobName);
            await blob.DeleteAsync();
        }

        private AzureBlobDeleter() { }
    }
}
