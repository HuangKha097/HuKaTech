import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: '100vh', backgroundColor: '#f9fafb',
            fontFamily: 'sans-serif', width: '100%'
        }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#374151', margin: 0 }}>404</h1>
            <h2 style={{ fontSize: '2rem', color: '#4b5563', marginBottom: '1rem' }}>
                Ôi hỏng! Không tìm thấy trang này.
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.4rem', marginBottom: '2rem', textAlign: 'center' }}>
                Đường dẫn bạn đang tìm kiếm có thể đã bị xóa, đổi tên <br />
                hoặc tạm thời không khả dụng.
            </p>
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '12px 24px', backgroundColor: '#2563eb', color: 'white',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '1.4rem', fontWeight: 'bold', transition: '0.3s'
                }}
            >
                Quay về Trang chủ
            </button>
        </div>
    );
};

export default NotFound;