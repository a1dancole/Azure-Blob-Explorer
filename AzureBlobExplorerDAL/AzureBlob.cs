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
    public class AzureBlob
    {
        public readonly CloudBlobClient CloudBlobClient;

        public AzureBlob()
        {
            var storageAccount = new CloudStorageAccount(new StorageCredentials(Environment.GetEnvironmentVariable(Constants.StorageAccountName), Environment.GetEnvironmentVariable(Constants.StorageAccountKey)), true);
            CloudBlobClient = storageAccount.CreateCloudBlobClient();
        }
    }
}
