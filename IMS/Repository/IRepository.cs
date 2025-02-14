using System.Linq.Expressions;

namespace IMS.Repository
{
    public interface IRepository<T> where T : class
    {
      
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task<T> Find(int id);
        Task<T> FindByCondition(Expression<Func<T, bool>> expression);
    }
}
