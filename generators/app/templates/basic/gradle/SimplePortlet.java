package org.jetray;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.Portlet;

import org.osgi.service.component.annotations.Component;

@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=<%=portletCategory%>",
		"javax.portlet.display-name=<%=portletTitle%>",
        "javax.portlet.name=<%=portletName%>",
		"com.liferay.portlet.instanceable=false",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user",
        "com.liferay.portlet.footer-portlet-javascript=/js/jsportlet.js",
        "com.liferay.portlet.header-portlet-css=/css/jsportlet.css"
	},
	service = Portlet.class
)
public class SimplePortlet extends MVCPortlet {
}