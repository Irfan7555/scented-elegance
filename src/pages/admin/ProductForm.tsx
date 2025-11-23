import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Perfume } from "@/lib/data";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<Partial<Perfume>>({
        name: "",
        brand: "",
        category: "women",
        price: 0,
        description: "",
        image: "perfume-women-1",
        inStock: true,
        featured: false,
        notes: {
            top: [],
            heart: [],
            base: []
        }
    });

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => api.getProduct(id!),
        enabled: isEditMode
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const createMutation = useMutation({
        mutationFn: api.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({ title: "Success", description: "Product created successfully" });
            navigate("/admin");
        },
        onError: () => toast({ title: "Error", description: "Failed to create product", variant: "destructive" })
    });

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Perfume>) => api.updateProduct(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', id] });
            toast({ title: "Success", description: "Product updated successfully" });
            navigate("/admin");
        },
        onError: () => toast({ title: "Error", description: "Failed to update product", variant: "destructive" })
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };

        if (isEditMode) {
            updateMutation.mutate(dataToSubmit);
        } else {
            createMutation.mutate(dataToSubmit as Omit<Perfume, 'id'>);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleNotesChange = (type: 'top' | 'heart' | 'base', value: string) => {
        const notesArray = value.split(',').map(s => s.trim());
        setFormData(prev => ({
            ...prev,
            notes: {
                ...prev.notes!,
                [type]: notesArray
            }
        }));
    };

    if (isEditMode && isLoading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h1 className="text-3xl font-serif font-bold mb-8">
                        {isEditMode ? "Edit Product" : "Add New Product"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand</Label>
                                <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="unisex">Unisex</option>
                                    <option value="exclusive">Exclusive</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                        </div>

                        <div className="space-y-4 border p-4 rounded-md">
                            <h3 className="font-semibold">Fragrance Notes (comma separated)</h3>
                            <div className="space-y-2">
                                <Label>Top Notes</Label>
                                <Input
                                    value={formData.notes?.top.join(', ')}
                                    onChange={(e) => handleNotesChange('top', e.target.value)}
                                    placeholder="e.g. Lemon, Bergamot"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Heart Notes</Label>
                                <Input
                                    value={formData.notes?.heart.join(', ')}
                                    onChange={(e) => handleNotesChange('heart', e.target.value)}
                                    placeholder="e.g. Rose, Jasmine"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Base Notes</Label>
                                <Input
                                    value={formData.notes?.base.join(', ')}
                                    onChange={(e) => handleNotesChange('base', e.target.value)}
                                    placeholder="e.g. Musk, Amber"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Product Image</Label>
                            <div className="flex gap-4 items-center">
                                <Input
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Image URL or Key"
                                    required
                                />
                                <div className="relative">
                                    <Input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                try {
                                                    const url = await api.uploadImage(file);
                                                    setFormData(prev => ({ ...prev, image: url }));
                                                    toast({ title: "Success", description: "Image uploaded successfully" });
                                                } catch (error) {
                                                    toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
                                                }
                                            }
                                        }}
                                    />
                                    <Button type="button" variant="outline">Upload</Button>
                                </div>
                            </div>
                            {formData.image && (
                                <div className="mt-2 w-20 h-20 rounded-md overflow-hidden border">
                                    <img
                                        src={formData.image.startsWith('http') ? formData.image : undefined}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-8">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="inStock"
                                    checked={formData.inStock}
                                    onCheckedChange={(checked) => handleSwitchChange('inStock', checked)}
                                />
                                <Label htmlFor="inStock">In Stock</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="featured"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                                />
                                <Label htmlFor="featured">Featured</Label>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black">
                                {isEditMode ? "Update Product" : "Create Product"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductForm;
