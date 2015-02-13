using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;

using RandomNameGeneratorLibrary;

namespace WebService.Controllers
{
    public class PatientController : Controller
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        public ActionResult Search(string search)
        {
           return  Json(_patientService.Search(search),JsonRequestBehavior.AllowGet);
        }
    }
}