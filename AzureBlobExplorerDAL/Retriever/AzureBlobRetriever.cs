using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorerDAL.Retriever
{
    public class AzureBlobRetriever : AzureBlob
    {
        public static async Task<AzureBlobRetriever> InitializeAsync()
        {
            var response = new AzureBlobRetriever();
            await response.CreateContainerIfNotExists();
            return response;
        }

        public async Task<IEnumerable<IListBlobItem>> GetAllBlobs()
        {
            var result = await CloudBlobContainer.ListBlobsSegmentedAsync(string.Empty, true, BlobListingDetails.All, int.MaxValue, null, null, null);
            return result.Results;
        }

        public async Task<ICloudBlob> GetBlob(string blobName) =>
            await CloudBlobContainer.GetBlobReferenceFromServerAsync(blobName);

        public async Task<Stream> GetBlobAsStream(string blobName)
        {
            var result = await CloudBlobContainer.GetBlobReferenceFromServerAsync(blobName);
            return await result.OpenReadAsync(AccessCondition.GenerateEmptyCondition(), null,null);
        }

        private AzureBlobRetriever() { }

    }
}
