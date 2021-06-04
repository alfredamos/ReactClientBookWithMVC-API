using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientBookWithMVC_API.Models
{
    public class Book
    {
        public int BookID { get; set; }
        public string Title { get; set; }
        public string ISBN { get; set; }
        public double Price { get; set; }
        public DateTime DateOfPublication { get; set; }

        [ForeignKey("Category")]
        public int CategoryID { get; set; }
        public Category Category { get; set; }

        [ForeignKey("Publisher")]
        public int PublisherID { get; set; }
        public Publisherr Publisher { get; set; }

        public List<BookAuthor> BookAuthors { get; set; }
    }
}
