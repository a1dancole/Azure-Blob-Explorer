using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AzureBlobExplorer.Dtos;
using Microsoft.WindowsAzure.Storage.Blob;

namespace AzureBlobExplorer.Mappers
{
    public static class ContainerMapper
    {
        public static IEnumerable<ContainerDetailsDto> ToContainerDetails(this IEnumerable<CloudBlobContainer> containers) => containers.Select(o => new ContainerDetailsDto
        {
            Name = o.Name,
            LastModified = o.Properties.LastModified
        });

    }
}
