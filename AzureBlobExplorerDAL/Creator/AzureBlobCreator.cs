using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorerDAL.Creator
{
    public class AzureBlobCreator : AzureBlob
    {
        public static async Task<AzureBlobCreator> InitializeAsync()
        {
            var response = new AzureBlobCreator();
            await response.CreateContainerIfNotExists();
            return response;
        }

        public async Task<ICloudBlob> CreateBlob(Stream file, string fileName, string contentType)
        {
            var blob = CloudBlobContainer.GetBlockBlobReference(fileName);
            blob.Properties.ContentType = contentType;
            await blob.UploadFromStreamAsync(file);
            return blob;
        }

        private AzureBlobCreator() : base() { }        
    }
}
