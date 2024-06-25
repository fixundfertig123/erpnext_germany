import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields

def execute():
	custom_fields = frappe.get_hooks("vat_id_no_custom_fields")
	create_custom_fields(custom_fields)

