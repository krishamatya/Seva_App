using IMS.Model.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace IMS.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AuthenticationDBContext _context;
        private readonly DbSet<T> _dbSet;
        public Repository(AuthenticationDBContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        
        public async Task<T> Find(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null)
            {
                throw new InvalidOperationException($"Entity with id {id} not found.");
            }
            return entity;
        }
       
        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.AsQueryable().Where(expression).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}
