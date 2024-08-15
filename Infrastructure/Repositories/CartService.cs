﻿using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using IDatabase = StackExchange.Redis.IDatabase;

namespace Infrastructure.Repositories
{
    public class CartService(IConnectionMultiplexer redis) : ICartService
    {
        private readonly IDatabase _database = redis.GetDatabase();
       
        public async Task<bool> DeleteCartAsync(string key)
        {
            return await _database.KeyDeleteAsync(key);
        }

        public async Task<ShoppingCart> GetCartAsync(string key)
        {
            var data = await _database.StringGetAsync(key);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<ShoppingCart>(data!);
        }

        public async Task<ShoppingCart?> SetCartAsync(ShoppingCart cart)
        {
            var created = await _database.StringSetAsync(cart.Id, JsonSerializer.Serialize(cart), TimeSpan.FromDays(10));
            if (!created) return null;
            return await GetCartAsync(cart.Id);
        }
    }
}
