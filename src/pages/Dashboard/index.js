import { Card, Row, Col } from 'antd';
import { DollarTwoTone, ContactsTwoTone, ProfileTwoTone } from "@ant-design/icons";
import "./Dashboard.css"
import StudentArea from '../../components/StudentArea';
import Revenue from '../../components/Revenue';
import CountInstructor from '../../components/CountInstructor';
import CountProgress from '../../components/CountProgress';
import PieRevenue from '../../components/PieRevenue';

function Dashboard() {
    return (
        <>
            <div style={{ padding: '20px', backgroundColor: "#F9FBFD" }}>
                <Row gutter={[16, 16]}>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                        <Card bordered={false} style={{ textAlign: 'center' }}>
                            <div className='Card--item__icon'>
                                <DollarTwoTone />
                            </div>
                            <div>
                                <Revenue />
                                <p>Tổng thu nhập</p>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                        <Card bordered={false} style={{ textAlign: 'center' }}>
                            <div className='Card--item__icon'>
                            <ProfileTwoTone />
                            </div>
                            <div>
                                <CountProgress />
                                <p>Học viên đăng kí</p>
                            </div>
                        </Card>
                    </Col>
                    <Col xxl={8} xl={8} lg={24} xs={24}>
                        <Card bordered={false} style={{ textAlign: 'center' }}>
                            <div className='Card--item__icon'>
                                <ContactsTwoTone />
                            </div>
                            <div>
                                <CountInstructor />
                                <p>Giảng viên</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <StudentArea />
                    </Col>
                    <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <PieRevenue />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Dashboard;