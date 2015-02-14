using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Mvc;
using WebService.Service;

namespace WebService
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
          
            AutofacInit();
        }

        private void AutofacInit()
        {
            var container = new ContainerBuilder();
            container.RegisterAssemblyTypes(typeof (FakePatientService).Assembly).AsImplementedInterfaces().AsSelf().InstancePerDependency();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container.Build()));
         
             
        }
    }
}