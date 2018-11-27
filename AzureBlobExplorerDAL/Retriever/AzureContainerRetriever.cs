using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorerDAL.Retriever
{
    public class AzureContainerRetriever : AzureBlob
    {
        public AzureContainerRetriever() : base()
        { }

        public async Task<IEnumerable<CloudBlobContainer>> GetAllContainers() => await ListContainersAsync();

        private async Task<IEnumerable<CloudBlobContainer>> ListContainersAsync()
        {
            BlobContinuationToken continuationToken = null;
            var response = new List<CloudBlobContainer>();
            do
            {
                var segment = await CloudBlobClient.ListContainersSegmentedAsync(continuationToken);
                continuationToken = segment.ContinuationToken;
                response.AddRange(segment.Results);
            }
            while (continuationToken != null);
            return response.Where(o => o.Properties.PublicAccess == BlobContainerPublicAccessType.Container);
        }
    }
}
