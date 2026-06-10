import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [stats, setStats] = useState({ users: 0, revenue: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/admin/stats');
            setStats(res.data);
        };
        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>SkateBoard Madness Admin</h1>
            <p>Admin Wallet: 0xb523566e3a36b2fd313e4aee2c90c0b131ed8857</p>
            <div className="card">
                <h3>Total Revenue: {stats.revenue} SKMAD</h3>
                <h3>Active Skaters: {stats.users}</h3>
            </div>
        </div>
    );
};

export default AdminPanel;