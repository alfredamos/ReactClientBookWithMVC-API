using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ReactClientBookWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientBookWithMVC_API.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<BookAuthor>().HasKey(x => new { x.AuthorID, x.BookID });

            builder.Entity<BookAuthor>().HasOne(x => x.Book).WithMany(x => x.BookAuthors)
                   .HasForeignKey(x => x.BookID);

            builder.Entity<BookAuthor>().HasOne(x => x.Author).WithMany(x => x.BookAuthors)
                   .HasForeignKey(x => x.AuthorID);

            base.OnModelCreating(builder);
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Publisherr> Publishers { get; set; }
    }
}
