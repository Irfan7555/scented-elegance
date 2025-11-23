import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', 'all'],
        queryFn: () => api.getProducts()
    });

    const deleteMutation = useMutation({
        mutationFn: api.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({
                title: "Product deleted",
                description: "The product has been successfully removed.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete product.",
                variant: "destructive",
            });
        }
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-serif font-bold">Product Management</h1>
                        <Link to="/admin/products/new">
                            <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-black">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Product
                            </Button>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-luxury-warm">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                                                    {/* Placeholder or actual image if URL */}
                                                    <div className="w-full h-full bg-luxury-gold/20 flex items-center justify-center text-xs">Img</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{product.brand}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Link to={`/admin/products/${product.id}/edit`}>
                                                        <Button variant="ghost" size="icon">
                                                            <Pencil className="w-4 h-4 text-blue-600" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
