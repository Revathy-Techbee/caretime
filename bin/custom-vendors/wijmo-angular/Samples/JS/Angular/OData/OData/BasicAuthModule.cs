using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OData
{
	public class BasicAuthModule: IHttpModule
	{
		public void Init(HttpApplication app)
		{
			app.AuthenticateRequest += new EventHandler(app_AuthenticateRequest);
		}

		void app_AuthenticateRequest(object sender, EventArgs e)
		{
			HttpApplication app = (HttpApplication)sender;
			string requestUrl = app.Context.Request.Url.ToString();
			if (requestUrl.IndexOf("/Northwind.svc/") == -1)
			{
				return;
			}
			//if (!app.Request.IsSecureConnection)
			//{
			//	CreateNotAuthorizedResponse(app, 403, 4,
			//		"SSL is required. Please ensure you use HTTPS in the address.");
			//	app.CompleteRequest();
			//}
			if (!app.Request.Headers.AllKeys.Contains("Authorization"))
			{
				CreateNotAuthorizedResponse(app, 401, 1, 
					"Please provide Authorization headers with your request.");
				app.CompleteRequest(); 
			}
			else if (!BasicAuthProvider.Authenticate(app.Context))
			{
				CreateNotAuthorizedResponse(app, 401, 1, "Logon failed.");
				app.CompleteRequest(); 
			}
		}

		private static void CreateNotAuthorizedResponse(HttpApplication app, int statusCode, int subCode, string description)
		{
			HttpResponse responese = app.Context.Response;
			responese.StatusCode = statusCode;
			responese.SubStatusCode = subCode;
			responese.StatusDescription = description;
			responese.AppendHeader("WWW-Authenticate", "Basic");
		}

		public void Dispose()
		{
		}
	}
}