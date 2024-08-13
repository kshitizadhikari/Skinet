using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBaseRepository<T> where T : BaseEntity
    {
        Task<T?> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> GetAllAsync();

        Task<T?> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> GetWithSpec(ISpecification<T> spec);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> SaveAllAsync();
        bool Exists(int id);
     
    }
}
