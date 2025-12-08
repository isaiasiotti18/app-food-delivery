import { CreateUserParams, SignInParams } from '@/type';
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: 'com.isaiasiotti.foodelivery',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: 'user',
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint || '')
  .setProject(appwriteConfig.projectId || '')
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
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
        $id: newAccount.$id,
        email: newAccount.email,
        name: newAccount.name,
        avatar: avatarUrl,
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
  } catch (error) {
    throw new Error(error as string);
  }
};
