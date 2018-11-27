using System;
using System.Collections.Generic;
using System.Text;

namespace AzureBlobExplorer.Dtos
{
    public class ContainerDetailsDto
    {
        public string Name { get; set; }
        public DateTimeOffset? LastModified { get; set; }
    }
}
