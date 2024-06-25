import frappe
from frappe.model.utils.rename_field import rename_field


def execute():
	dt = "VAT ID Check"
	# Add link to Company connections
	frappe.get_doc(
		{
			"doctype": "DocType Link",
			"parent": "Company",
			"parentfield": "links",
			"parenttype": "Customize Form",
			"group": "Company VAT Status",
			"link_doctype": dt,
			"link_fieldname": "party",
			"custom": 1,
		}
	).insert(ignore_if_duplicate=True)
