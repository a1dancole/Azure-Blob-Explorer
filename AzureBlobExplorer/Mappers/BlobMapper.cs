using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureBlobExplorer.Dtos;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorer.Mappers
{
    public static class BlobMapper
    {
        public static IEnumerable<BlobDetailDto> ToBlobDetails(this IEnumerable<IListBlobItem> items) =>
            items.Select(o => GetBlobDetailFromBlob(o, (ICloudBlob) o));

        private static BlobDetailDto GetBlobDetailFromBlob(IListBlobItem cloudItem, ICloudBlob blob) => new BlobDetailDto
        {
            FileName = blob.Name,
            ContentType = blob.Properties.ContentType,
            CreatedTime = blob.Properties.Created,
            LastModified = blob.Properties.LastModified,
            DownloadUrl = cloudItem.Uri.AbsoluteUri
        };

    }
}
