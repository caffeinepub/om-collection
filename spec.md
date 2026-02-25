# Specification

## Summary
**Goal:** Add a product catalogue with upload and rates management to the OM Collection app.

**Planned changes:**
- Add backend data model and CRUD API for products (fields: id, name, category, price, imageUrl, description) stored in stable memory
- Add a Catalogue page displaying all products in a responsive grid with category filter controls; each card shows image, name, category badge, and price in ₹
- Add an Admin "Add Product" page with a form (Name, Category dropdown, Price, Image URL, Description), client-side validation, and success confirmation
- Add "Catalogue" and "Add Product" navigation links to the existing navbar

**User-visible outcome:** Users can browse all products in a filterable catalogue grid, and admins can upload new products with pricing through a dedicated form page — all styled in the existing saffron/gold and maroon theme.
