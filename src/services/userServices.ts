import {
    collection,
    addDoc,
    query,
    doc,
    getDoc,
    getDocs,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteDoc,
    setDoc,
} from "firebase/firestore";
import { formData } from "@/schema/formLinks.schema";
import { db } from "@/lib/firebaseAuth";

export class UserServices {
    async getUserdata(
        uid: string
    ): Promise<{ data?: unknown; error?: string }> {
        const docRef = doc(db, "users", uid);
        try {
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                return { data: snap.data() };
            } else {
                return { error: "User not found" };
            }
        } catch (error: unknown) {
            return {
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }

    async addUserLinks(
        uid: string,
        formData: formData
    ): Promise<{ sucess: boolean }> {
        const ref = collection(db, "users", uid, "links");
        await addDoc(ref, {
            ...formData, // Adicionamos a URL do favicon ao documento
            date: new Date(),
        });

        return { sucess: true };
    }
    catch(error: unknown) {
        console.error("Erro ao adicionar link:", error);
        return { error: "Erro ao adicionar o link." };
    }

    async getUserLinks(
        uid: string
    ): Promise<{ data?: unknown[]; error?: string }> {
        try {
            const q = query(collection(db, "users", uid, "links"));
            const snapshot = await getDocs(q);
            const links = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return { data: links };
        } catch (error) {
            console.error("Erro ao buscar links:", error);
            return { error: "Erro ao buscar os links do usuário." };
        }
    }

    getLinksRealtime(
        uid: string,
        onData: (data: unknown[]) => void,
        onError?: (error: string) => void
    ) {
        const linksRef = collection(db, "users", uid, "links");
        const q = query(linksRef, orderBy("date", "asc"));
        const unsubscribe = onSnapshot(
            q,
            (snapShot) => {
                const listLinks: unknown[] = [];
                snapShot.forEach((doc) => {
                    listLinks.push({ id: doc.id, ...doc.data() });
                });
                onData(listLinks);
            },
            (error) => {
                if (onError) onError(error.message);
            }
        );
        return unsubscribe;
    }

    async updateUserLink(
        uid: string,
        linkId: string,
        data: Partial<formData>
    ): Promise<{ success: boolean; error?: string }> {
        try {
            const linkRef = doc(db, "users", uid, "links", linkId);

            // Tenta atualizar primeiro
            await updateDoc(linkRef, data);
            console.log("Documento atualizado com sucesso!");
            return { success: true };
        } catch (error: any) {
            // Se o documento não existir, cria um novo
            if (
                error.code === "not-found" ||
                error.message?.includes("No document to update")
            ) {
                try {
                    const linkRef = doc(db, "users", uid, "links", linkId);
                    await setDoc(linkRef, data);
                    console.log("Documento criado com sucesso!");
                    return { success: true };
                } catch (setError: any) {
                    console.error("Erro ao criar documento:", setError);
                    return { success: false, error: setError.message };
                }
            }

            // Outro erro (ex: permissão, rede, etc)
            console.error("Erro ao atualizar link:", error);
            return { success: false, error: error.message };
        }
    }

    async deleteUserLink(
        uid: string,
        linkId: string
    ): Promise<{ success: boolean; error?: string }> {
        try {
            const linkRef = doc(db, "users", uid, "links", linkId);
            await deleteDoc(linkRef);
            return { success: true };
        } catch (error: unknown) {
            console.error("Erro ao deletar link:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }
}
