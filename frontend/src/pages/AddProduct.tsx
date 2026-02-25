import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, IndianRupee, Image as ImageIcon } from 'lucide-react';
import { Category } from '../backend';
import { useAddProduct } from '../hooks/useQueries';

interface FormData {
  name: string;
  category: Category | '';
  price: string;
  imageUrl: string;
  description: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  imageUrl?: string;
  description?: string;
}

const categoryOptions: { value: Category; label: string }[] = [
  { value: Category.mensWear, label: "Men's Wear" },
  { value: Category.womensWear, label: "Women's Wear" },
  { value: Category.kidsWear, label: "Kids' Wear" },
  { value: Category.ethnicWear, label: 'Traditional/Ethnic Wear' },
  { value: Category.accessories, label: 'Accessories' },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Product name is required.';
  if (!data.category) errors.category = 'Please select a category.';
  if (!data.price.trim()) {
    errors.price = 'Price is required.';
  } else {
    const priceNum = Number(data.price);
    if (isNaN(priceNum) || priceNum <= 0 || !Number.isInteger(priceNum)) {
      errors.price = 'Price must be a positive whole number.';
    }
  }
  if (!data.imageUrl.trim()) errors.imageUrl = 'Image URL is required.';
  if (!data.description.trim()) errors.description = 'Description is required.';
  return errors;
}

export default function AddProduct() {
  const router = useRouter();
  const addProductMutation = useAddProduct();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: '',
    imageUrl: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [successId, setSuccessId] = useState<bigint | null>(null);
  const [previewImg, setPreviewImg] = useState('');

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === 'imageUrl') {
      setPreviewImg(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const id = await addProductMutation.mutateAsync({
        name: formData.name.trim(),
        category: formData.category as Category,
        price: BigInt(Math.round(Number(formData.price))),
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim(),
      });
      setSuccessId(id);
      setFormData({ name: '', category: '', price: '', imageUrl: '', description: '' });
      setPreviewImg('');
      setErrors({});
    } catch (err) {
      // Error handled by mutation state
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-maroon py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.navigate({ to: '/catalogue' })}
            className="inline-flex items-center gap-2 text-cream/60 hover:text-saffron font-sans text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalogue
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-saffron" />
            <span className="text-saffron font-sans text-sm font-semibold tracking-widest uppercase">Admin</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-cream">Add New Product</h1>
          <p className="font-sans text-cream/60 text-sm mt-1">Fill in the details to add a product to the catalogue.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Success Banner */}
        {successId !== null && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-semibold text-green-800 text-sm">Product added successfully!</p>
              <p className="font-sans text-green-700 text-xs mt-0.5">Product ID: {Number(successId)}</p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => router.navigate({ to: '/catalogue' })}
                  className="text-xs font-sans font-bold text-green-700 underline hover:no-underline"
                >
                  View Catalogue
                </button>
                <button
                  onClick={() => setSuccessId(null)}
                  className="text-xs font-sans font-bold text-green-700 underline hover:no-underline"
                >
                  Add Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mutation Error Banner */}
        {addProductMutation.isError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-semibold text-red-800 text-sm">Failed to add product.</p>
              <p className="font-sans text-red-700 text-xs mt-0.5">
                {addProductMutation.error instanceof Error
                  ? addProductMutation.error.message
                  : 'An unexpected error occurred. Please try again.'}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            {/* Product Name */}
            <div>
              <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">
                Product Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Silk Banarasi Saree"
                className={`w-full px-4 py-2.5 rounded border font-sans text-sm bg-card focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-colors ${
                  errors.name ? 'border-destructive focus:border-destructive' : 'border-input focus:border-saffron'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive font-sans flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-2.5 rounded border font-sans text-sm bg-card focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-colors cursor-pointer ${
                  errors.category ? 'border-destructive focus:border-destructive' : 'border-input focus:border-saffron'
                } ${!formData.category ? 'text-muted-foreground' : 'text-foreground'}`}
              >
                <option value="" disabled>Select a category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-destructive font-sans flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.category}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">
                Price (₹) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="e.g. 1499"
                  className={`w-full pl-10 pr-4 py-2.5 rounded border font-sans text-sm bg-card focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-colors ${
                    errors.price ? 'border-destructive focus:border-destructive' : 'border-input focus:border-saffron'
                  }`}
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-xs text-destructive font-sans flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.price}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">
                Image URL <span className="text-destructive">*</span>
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://example.com/product-image.jpg"
                className={`w-full px-4 py-2.5 rounded border font-sans text-sm bg-card focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-colors ${
                  errors.imageUrl ? 'border-destructive focus:border-destructive' : 'border-input focus:border-saffron'
                }`}
              />
              {errors.imageUrl && (
                <p className="mt-1 text-xs text-destructive font-sans flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.imageUrl}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground font-sans">
                Provide a direct link to the product image.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block font-sans text-sm font-semibold text-foreground mb-1.5">
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the product — material, style, occasion, etc."
                className={`w-full px-4 py-2.5 rounded border font-sans text-sm bg-card focus:outline-none focus:ring-2 focus:ring-saffron/40 transition-colors resize-none ${
                  errors.description ? 'border-destructive focus:border-destructive' : 'border-input focus:border-saffron'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-destructive font-sans flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.description}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={addProductMutation.isPending}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-maroon text-cream font-sans font-bold rounded hover:bg-maroon-deep transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {addProductMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  'Add to Catalogue'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.navigate({ to: '/catalogue' })}
                className="px-6 py-3 border border-border text-foreground font-sans font-semibold rounded hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Image Preview */}
          <div className="lg:col-span-1">
            <p className="font-sans text-sm font-semibold text-foreground mb-2">Image Preview</p>
            <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-secondary flex items-center justify-center overflow-hidden">
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                  onError={() => setPreviewImg('')}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                  <ImageIcon className="w-10 h-10 opacity-40" />
                  <p className="font-sans text-xs">Enter an image URL to see a preview</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="mt-4 p-4 bg-secondary rounded-lg border border-border">
              <h4 className="font-sans text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Tips</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground font-sans">
                <li>• Use high-quality square images (400×400px or larger)</li>
                <li>• Ensure the image URL is publicly accessible</li>
                <li>• Price must be a whole number in Indian Rupees (₹)</li>
                <li>• All fields are required before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
