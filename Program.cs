using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers(); // add this

var app = builder.Build();

app.MapControllers(); // add this

app.MapGet("/", () => "Hello World!");

app.Run();
