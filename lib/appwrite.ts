import { CreateUserParams, SignInParams, GetMenuParams } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: 'com.isaiasiotti.foodelivery',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  assestsBucketId: '6942e7420023d47de4b3',
  userCollectionId: 'user',
  categoriesCollectionId: '6942dd4c000d9a250c72',
  menuCollectionId: '6942e1e9001e641b3ba7',
  customizationsCollectionId: 'customizations',
  menuCustomizationCollectionId: '6942e575000d55d7df05',
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint || '')
  .setProject(appwriteConfig.projectId || '')
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ name, email, password }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    if (!appwriteConfig.databaseId) throw Error;

    const newUser = await databases.createDocument({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.userCollectionId,
      documentId: ID.unique(),
      data: {
        email: newAccount.email,
        name: newAccount.name,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      },
    });

    if (!newUser) throw Error;

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    if (!session) throw Error;

    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.userCollectionId,
      queries: [Query.equal('accountId', currentAccount.$id)],
    });

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal('categories', category));
    if (query) queries.push(Query.search('name', query));

    const menus = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.menuCollectionId,
      queries: queries,
    });

    return menus.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.categoriesCollectionId,
    });

    return categories;
  } catch (error) {
    throw new Error(error as string);
  }
};
