using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _config;
        private readonly ICartService _cartService;
        private readonly IBaseRepository<Core.Entities.Product> _productRepo;
        private readonly IBaseRepository<DeliveryMethod> _deliveryMethodRepo;

        public PaymentService(
            IConfiguration config,
            ICartService cartService,
            IBaseRepository<Core.Entities.Product> productRepo,
            IBaseRepository<DeliveryMethod> deliveryMethodRepo)
        {
            _config = config;
            _cartService = cartService;
            _productRepo = productRepo;
            _deliveryMethodRepo = deliveryMethodRepo;
        }

        public async Task<ShoppingCart?> CreateOrUpdatePaymentIntent(string cartId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            var cart = await _cartService.GetCartAsync(cartId);
            if (cart == null) return null;

            var shippingPrice = 0m;

            if (cart.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _deliveryMethodRepo.GetByIdAsync((int)cart.DeliveryMethodId);
                if (deliveryMethod == null) return null;
                shippingPrice = deliveryMethod.Price;
            }

            foreach (var item in cart.Items)
            {
                var productItem = await _productRepo.GetByIdAsync(item.ProductId);
                if (productItem == null) return null;

                if (item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            var service = new PaymentIntentService();
            PaymentIntent? intent;

            var amount = (long)cart.Items.Sum(x => x.Quantity * (x.Price * 100)) + (long)shippingPrice * 100;

            if (string.IsNullOrEmpty(cart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = amount,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = await service.CreateAsync(options);
                cart.PaymentIntentId = intent.Id;
                cart.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = amount
                };
                intent = await service.UpdateAsync(cart.PaymentIntentId, options);
            }

            await _cartService.SetCartAsync(cart);
            return cart;
        }
    }
}
