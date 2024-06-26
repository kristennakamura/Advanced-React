import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('adding to cart!');
  // 1. Query current user to see if they are signed in
  const sesh = context.session as Session;
  console.log(sesh);
  console.log(productId);
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // 2. Query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });

  const [existingCartItem] = allCartItems;
  console.log(allCartItems);
  if (existingCartItem) {
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  return context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });

  // 3. See if the current item is in their cart
  // 4. if it is increment by 1
  // 5. if it isn't create a new cart item
}
