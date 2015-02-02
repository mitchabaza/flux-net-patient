using System.Collections.Generic;
using WebService.Models;

namespace WebService.Controllers
{
    public  interface IPatientService
    {
        IEnumerable<PatientViewModel> Search(string search);
    }
}