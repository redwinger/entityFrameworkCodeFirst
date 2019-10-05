using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sta.Data.context;
using EntityFrameworkCodeFirst.DtoModels.TripManagement;
using AutoMapper;
using Sta.Domain.TripManagement;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EntityFrameworkCodeFirst.Controllers.api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TripManagementController : BaseController
    {
        private readonly StaDbContext _dbContext;
        private readonly IMapper _mapper;
        public TripManagementController(StaDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public TripDto CreateTrip([FromBody] TripDto trip)
        {
            var dbtrip = new Trip()
            {
                Name = trip.Name,
                TotalCost = trip.TotalCost,
                TotalActivities = trip.TotalActivities,
            };

            _dbContext.Trips.Add(dbtrip);

            _db.SaveChanges();

            return _mapper.Map<TripDto>(dbtrip);

        }

        [HttpPatch("[action]")]
        public TripDto EditTrip([FromBody] TripDto newTrip)
        {
            var oldTrip = _dbContext.Trips.Single(trip => trip.Id == newTrip.Id);

            oldTrip.Name = newTrip.Name;

            _db.SaveChanges();

            return _mapper.Map<TripDto>(oldTrip);
        }

        [HttpGet("[action]")]
        public List<TripDto> GetTrips()
        {
            var trips = _dbContext.Trips
                .Select(trip => _mapper.Map<TripDto>(trip))
                .ToList();

            return trips;
        }

        [HttpDelete("[action]")]
        public void DeleteTrip(int id)
        {
            var dbTrip = _dbContext.Trips.Single(trip => trip.Id == id);

            _db.Trips.Remove(dbTrip);
            _db.SaveChanges();
        }

        [HttpGet("[action]")]
        public List<TripItemDto> GetTripItems([FromQuery] int id)
        {
            var dbItems = _dbContext.TripItems
                .Where(item => item.TripId == id);

            var items = dbItems
                .Select(item => _mapper.Map<TripItemDto>(item))
                .ToList();

            return items;
        }

        [HttpPost("[action]")]
        public TripItemDto CreateTripItem([FromBody] TripItemDto item)
        {
            var dbItem = new TripItem
            {
                Name = item.Name,
                Notes = item.Notes,
                Address = item.Address,
                Cost = item.Cost,
                LocalCost = item.LocalCost,
                TripId = item.TripId,
                Trip = _mapper.Map<Trip>(item.Trip),
            };

            _dbContext.TripItems.Add(dbItem);

            var dbTrip = _db.Trips.Single(trip => trip.Id == item.TripId);

            dbTrip.TotalActivities = dbTrip.TotalActivities + 1;
            dbTrip.TotalCost = dbTrip.TotalCost + item.Cost;

            _db.SaveChanges();

            return _mapper.Map<TripItemDto>(dbItem);
        }

        [HttpPatch("[action]")]
        public TripItemDto EditTripItem([FromBody] TripItemDto item)
        {
            var dbItem = _db.TripItems.Single(i => i.Id == item.Id);
            var dbTrip = _db.Trips.Single(trip => trip.Id == item.TripId);

            dbItem.Name = item.Name;
            dbItem.Notes = item.Notes;
            dbItem.Address = item.Address;
            dbItem.Cost = item.Cost;
            dbItem.LocalCost = item.LocalCost;

            dbTrip.TotalCost = dbTrip.TotalCost - dbItem.Cost + item.Cost;

            _db.SaveChanges();

            return _mapper.Map<TripItemDto>(dbItem);
        }

        [HttpDelete("[action]")]
        public void DeleteTripItem([FromQuery] int id)
        {
            var dbItem = _db.TripItems.Single(item => item.Id == id);
            var dbTrip = _db.Trips.Single(trip => trip.Id == dbItem.TripId);

            _db.TripItems.Remove(dbItem);

            dbTrip.TotalActivities--;
            dbTrip.TotalCost = dbTrip.TotalCost - dbItem.Cost;

            _db.SaveChanges();
        }


    }
}
