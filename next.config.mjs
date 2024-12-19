/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Chỉ bật khi cần phân tích bundle
})({
  // Bật các tính năng nâng cao
  reactStrictMode: true, // Giúp phát hiện lỗi trong React
  swcMinify: true, // Dùng trình biên dịch SWC để giảm kích thước mã và cải thiện hiệu suất

  experimental: {
    optimizeCss: true, // Tối ưu hóa CSS (hữu ích nếu dùng Tailwind CSS hoặc các framework CSS khác)
    appDir: true, // Bật kiến trúc thư mục app (nếu bạn dùng cấu trúc mới của Next.js)
  },

  // Tối ưu hóa import module
  modularizeImports: {
    'lodash': {
      transform: 'lodash/{{member}}', // Chỉ import các module cần thiết thay vì toàn bộ thư viện
    },
    'react-icons': {
      transform: 'react-icons/{{member}}', // Tối ưu react-icons để tải nhẹ hơn
    },
  },

  // Cấu hình cho images (nếu dùng)
  images: {
    formats: ['image/avif', 'image/webp'], // Hỗ trợ các định dạng ảnh tối ưu
    domains: ['your-image-domain.com'], // Thay 'your-image-domain.com' bằng domain bạn sử dụng
  },

  // Cấu hình phân tích hiệu suất
  webpack: (config) => {
    if (process.env.ANALYZE === 'true') {
      console.log('Webpack bundle analyzer enabled');
    }
    return config;
  },
});

export default config;
