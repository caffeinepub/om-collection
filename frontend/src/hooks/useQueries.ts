import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Category } from '../backend';

export function useGetProducts() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: Category) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsSortedByPrice() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['products', 'sorted', 'price'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsSortedByPrice();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsSortedByName() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['products', 'sorted', 'name'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsSortedByName();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      category,
      price,
      imageUrl,
      description,
    }: {
      name: string;
      category: Category;
      price: bigint;
      imageUrl: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addProduct(name, category, price, imageUrl, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      category,
      price,
      imageUrl,
      description,
    }: {
      id: bigint;
      name: string;
      category: Category;
      price: bigint;
      imageUrl: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateProduct(id, name, category, price, imageUrl, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
