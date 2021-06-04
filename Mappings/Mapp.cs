using AutoMapper;
using ReactClientBookWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientBookWithMVC_API.Mappings
{
    public class Mapp : Profile
    {
        public Mapp()
        {
            CreateMap<Author, Author>();
            CreateMap<Book, Book>();
            CreateMap<Category, Category>();
            CreateMap<Publisherr, Publisherr>();
        }
    }
}
