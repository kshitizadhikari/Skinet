using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly IBaseRepository<DeliveryMethod> _deliveryMethodRepo;

        public PaymentsController(IPaymentService paymentService, IBaseRepository<DeliveryMethod> deliveryMethodRepo)
        {
            _paymentService = paymentService;
            _deliveryMethodRepo = deliveryMethodRepo;
        }

        [HttpPost("{cartId}")]
        public async Task<ActionResult<ShoppingCart>> CreateOrUpdatePaymentIntent(string cartId)
        {
            var cart = await _paymentService.CreateOrUpdatePaymentIntent(cartId);
            if (cart == null) return BadRequest("Problem with your cart.");
            return Ok(cart);
        }

        [HttpGet("delivery-methods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            var deliveryMethods = await _deliveryMethodRepo.GetAllAsync();
            return Ok(deliveryMethods);
        }
    }
}
