import axios from 'axios';

// axios.post(url, data, config) → data là body.
// axios.delete(url, config) → muốn gửi body, phải đặt trong config.data.
// vd: await axios.delete(url, { data: { id }, headers: { ... } });
export const addNewProduct = async (data) => {
    const res = await axios.post(`http://localhost:8000/api/product/add-new-product`, data);
    return res.data;
};

// 2. GET: Lấy tất cả
export const getAllProducts = async () => {
    const res = await axios.get(`http://localhost:8000/api/product/get-all-products`);
    return res.data;
};

// 3. GET: Sản phẩm trang chủ
export const getProductToShowHome = async () => {
    const res = await axios.get(`http://localhost:8000/api/product/get-product-to-show-home`);
    return res.data;
};

// 4. GET: Theo danh mục (Dùng params ?category=...)
export const getProductsByCategory = async (category) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-products-by-category`, {
        params: { category: category }
    });
    return res.data;
};

// 5. GET: Theo tên (Search params ?name=...)
export const getProductsByName = async (name) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-products-by-name`, {
        params: { name: name }
    });
    return res.data;
};

// 6. GET: Theo loại (params ?type=...)
export const getProductsByType = async (type) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-products-by-type`, {
        params: { type: type }
    });
    return res.data;
};

// --- CÁC PHẦN SỬA ĐỔI QUAN TRỌNG ---

// 7. GET: Chi tiết theo ID
// Router: /get-product-by-id/:id
// Cách gọi đúng: .../get-product-by-id/659abc...
export const getProductsById = async (id) => {
    const res = await axios.get(`http://localhost:8000/api/product/get-product-by-id/${id}`);
    return res.data;
};

// 8. DELETE: Xóa sản phẩm
// Router: /delete-product/:id
// Cách gọi đúng: .../delete-product/659abc...
export const deleteProduct = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/product/delete-product/${id}`);
    return res.data;
};

export const getRelatedProducts = async (type, id) => {
    const res = await axios.get(
        `http://localhost:8000/api/product/get-related-products/${id}?type=${type}`
    );
    return res.data;
};

