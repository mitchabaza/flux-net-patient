using System;
using System.Collections.Generic;
using RandomNameGeneratorLibrary;
using WebService.Controllers;
using WebService.Models;

namespace WebService.Service
{
    public class FakePatientService : IPatientService
    {  
        
        
        private readonly Random _random = new Random();
        private readonly PersonNameGenerator _nameGenerator = new PersonNameGenerator();

        public IEnumerable<PatientViewModel> Search(string search)
        {
            var list = new List<PatientViewModel>();
            for (int i = 0; i < _random.Next(3, 12); i++)
            {
                list.Add(new PatientViewModel()
                {
                    FirstName = _nameGenerator.GenerateRandomFirstName(),
                    LastName = _nameGenerator.GenerateRandomLastName(),
                    DateOfBirth = RandomDate(1923, 2000).ToString("yyyy-MM-dd"),
                    MRN=Guid.NewGuid().ToString().Substring(0,7),
                    SSN = _random.Next(222, 400) + "-" + _random.Next(0, 20).ToString("00") + "-" + _random.Next(1000, 9000),
                    AdmitDate = RandomDate(DateTime.Now.Year, DateTime.Now.Year).ToShortDateString(),
                    Height = _random.Next(56,70) + "\"",
                    Weight = _random.Next(130,220) + " lbs."
                });
            }
            return list;
        }

        private   DateTime RandomDate(int startYear, int endYear)
        {
            return new DateTime(_random.Next(startYear, endYear), _random.Next(1, 12), _random.Next(1, 28));

        }
    }
}