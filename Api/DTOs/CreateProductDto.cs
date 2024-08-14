using System.ComponentModel.DataAnnotations;

namespace Api.DTOs
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(1, double.MaxValue, ErrorMessage = "Price must be greater that 1")]
        public decimal Price { get; set; }

        [Required]
        public string PictureUrl { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string Brand { get; set; } = string.Empty;

        [Range(1, int.MaxValue, ErrorMessage = "Quantity in stock must be greater than 0")]
        public int QuantityInStock { get; set; }
    }
}
