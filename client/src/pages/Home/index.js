import React, { useRef, useEffect, useState } from 'react';
import * as ImageService from '../../services/imageService';
import * as DeletedImgService from '../../services/deletedImgService';
import * as userService from '../../services/userService'
import Button from '../../components/Button';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

function Home() {
    const images = [
        "https://cdnv2.tgdd.vn/mwg-static/topzone/Banner/ee/58/ee58ca26322d2881aeca1fe2f35a5d38.png",
        "https://cdnv2.tgdd.vn/mwg-static/topzone/Banner/30/51/30512b9286aa60273933891bcfc2fb2d.jpg",
        "https://cdnv2.tgdd.vn/mwg-static/topzone/Banner/fc/4a/fc4a56b06365bb9f42d59c6e05d33def.png",
    ];
    const [capacity, setCapacity] = useState({
        used: 0,
        total: 0,
    });
    const progress = useRef(null);
    const imgRefs = useRef([]);
    const imgCircle = useRef([]);
    const listImagesRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgWidths, setImgWidths] = useState([]);
    const intervalId = useRef(null);

    useEffect(() => {
        const widths = imgRefs.current.map(img => img ? img.clientWidth : 0);
        setImgWidths(widths);
        startAutoSlide();
        return () => clearInterval(intervalId.current); // Dọn dẹp khi unmount
    }, [images.length]);

    const startAutoSlide = () => {
        intervalId.current = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % (images.length + 1));
        }, 2000);
    };

    const handleLeftClick = () => {
        clearInterval(intervalId.current); // Hủy interval khi nhấn nút
        setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
        startAutoSlide();
    };

    const handleRightClick = () => {
        clearInterval(intervalId.current); // Hủy interval khi nhấn nút
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        startAutoSlide();
    };

    useEffect(() => {
        const width = imgWidths[0] || 0;
        if (listImagesRef.current) {
            if (currentIndex === images.length) {
                // Đặt tất cả các vòng tròn thành màu xám
                imgCircle.current.forEach(circle => {
                    if (circle) {
                        circle.style.backgroundColor = 'gray';
                    }
                });

                // Đặt vòng tròn đầu tiên thành màu đen
                imgCircle.current[0].style.backgroundColor = 'black';

                // Đặt vị trí danh sách hình ảnh về vị trí 0
                listImagesRef.current.style.transition = "none";
                listImagesRef.current.style.transform = `translateX(0px)`;
                setTimeout(() => {
                    // listImagesRef.current.style.transition = "0.5s ease-in-out 0.2s";
                    setCurrentIndex(1); // Đặt lại chỉ số về 0
                }, 2000);
            } else {
                // Chuyển đổi danh sách hình ảnh theo currentIndex
                listImagesRef.current.style.transform = `translateX(-${width * currentIndex}px)`;

                // Cập nhật màu cho các vòng tròn dựa trên chỉ số hiện tại
                imgCircle.current.forEach((circle, index) => {
                    if (circle) {
                        circle.style.backgroundColor = index === currentIndex ? 'black' : 'gray';
                    }
                });
            }
        }
    }, [currentIndex]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await ImageService.showAllImages();
                const totalSize1 = res1.data.reduce((sum, obj) => sum + obj.fileSize, 0);
                const res2 = await DeletedImgService.showDeletedImages();
                const totalSize2 = res2.data.reduce((sum, obj) => sum + obj.fileSize, 0);
                const totalSize = (totalSize1 + totalSize2) / 1024;
                const res = await userService.getUser();
                const storage = res.capacity;
                setCapacity({
                    used: totalSize.toFixed(2),
                    total: storage,
                });
                const usagePercentage = (totalSize.toFixed(2) / storage) * 100; // Giả sử 1MB là dung lượng tối đa
                if (progress.current) {
                    progress.current.style.width = `${usagePercentage}%`;
                    progress.current.textContent = `${usagePercentage.toFixed(2)}%`;
                    progress.current.classList.remove(cx('green'), cx('red'));
                    if (usagePercentage <= 70) {
                        progress.current.classList.add(cx('green'));
                    } else {
                        progress.current.classList.add(cx('red'));
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <div ref={listImagesRef} className={cx('list-images')}>
                    {images.map((src, index) => (
                        <img
                            key={index}
                            ref={el => imgRefs.current[index] = el}
                            src={src}
                            style={{ width: '100%', height: '280px' }}
                            alt={`Image ${index + 1}`}
                        />
                    ))}
                </div>
                <div className={cx('btn')}>
                    <div className={cx('btn-left')} onClick={handleLeftClick}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                    <div className={cx('btn-right')} onClick={handleRightClick}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
                <div className={cx("circle")}>
                    {images.map((src, index) => (
                        <div key={index} className={cx('items-circle')} ref={el => imgCircle.current[index] = el}>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('block')}>
                <div className={cx('storage-info')}>
                    <h2 className={cx('title')}>Storage Usage</h2>
                    <p>Storage used: {capacity.used}MB of {capacity.total}MB</p>
                    <div className={cx('progress-container')}>
                        <div className={cx('progress-bar')} ref={progress}></div>
                    </div>
                    <Button to="/upgrade" four className={cx('btn-upgrade')}>Upgrade</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
