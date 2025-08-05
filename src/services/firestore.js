import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Crew operations
export const crewService = {
  // Create a new crew
  async createCrew(crewData, userId) {
    try {
      const crewRef = await addDoc(collection(db, 'crews'), {
        ...crewData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return crewRef.id;
    } catch (error) {
      console.error('Error creating crew:', error);
      throw error;
    }
  },

  // Get crews for a user
  async getUserCrews(userId) {
    try {
      const q = query(
        collection(db, 'crews'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user crews:', error);
      throw error;
    }
  },

  // Update a crew
  async updateCrew(crewId, crewData) {
    try {
      const crewRef = doc(db, 'crews', crewId);
      await updateDoc(crewRef, {
        ...crewData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating crew:', error);
      throw error;
    }
  },

  // Delete a crew
  async deleteCrew(crewId) {
    try {
      await deleteDoc(doc(db, 'crews', crewId));
    } catch (error) {
      console.error('Error deleting crew:', error);
      throw error;
    }
  }
};

// Agent operations
export const agentService = {
  // Create a new agent
  async createAgent(agentData, userId) {
    try {
      const agentRef = await addDoc(collection(db, 'agents'), {
        ...agentData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return agentRef.id;
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  },

  // Get agents for a user
  async getUserAgents(userId) {
    try {
      const q = query(
        collection(db, 'agents'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user agents:', error);
      throw error;
    }
  },

  // Update an agent
  async updateAgent(agentId, agentData) {
    try {
      const agentRef = doc(db, 'agents', agentId);
      await updateDoc(agentRef, {
        ...agentData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  },

  // Delete an agent
  async deleteAgent(agentId) {
    try {
      await deleteDoc(doc(db, 'agents', agentId));
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  }
};
