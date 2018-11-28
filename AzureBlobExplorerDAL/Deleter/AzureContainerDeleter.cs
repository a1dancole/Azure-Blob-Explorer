using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AzureBlobExplorerDAL.Deleter
{
    public class AzureContainerDeleter : AzureContainer
    {
        public static async Task<AzureContainerDeleter> InitializeAsync(string containerName)
        {
            var response = new AzureContainerDeleter(containerName);
            await response.CreateContainerIfNotExists();
            return response;
        }

        public async Task<bool> DeleteContainer() => await CloudBlobContainer.DeleteIfExistsAsync();

        private AzureContainerDeleter(string containerName) : base(containerName) { }

    }
}
