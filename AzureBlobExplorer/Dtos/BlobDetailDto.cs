using System;
using System.Collections.Generic;
using System.Text;

namespace AzureBlobExplorer.Dtos
{
    public class BlobDetailDto
    {
        public string FileName { get; set; }

        public string ContentType { get; set; }

        public string DownloadUrl { get; set; }

        public DateTimeOffset? CreatedTime { get; set; }

        public DateTimeOffset? LastModified { get; set; }
    }
}
