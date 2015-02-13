using System.Web.Mvc;
using WebService.Service;

namespace WebService.Controllers
{
    public class FormController : Controller
    {
        private readonly IFormService _formService;

        public FormController(IFormService formService)
        {
            _formService = formService;
        }

        public ActionResult ListFieldValues(string field)
        {
            return  Json(_formService.ListFields( field),JsonRequestBehavior.AllowGet);
        }

    }
}