/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React from 'react'
import {
    Box,
    Button,
    Flex,
    Text,
} from 'theme-ui'
import CloseIcon from '../../public/assets/images/icons/close.svg'
import SearchInput from '../SearchInput';

interface SearchProps {
    onClose: () => void
}

const Search = ({ onClose }) => {
    return (
        <Flex
            bg="background"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                flexDirection: 'column',
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Flex
                    px={[24, 28, 32]}
                    sx={{
                        flex: 1,
                        alignItems: 'center',
                        height: 78,
                        borderBottomWidth: 1,
                        borderBottomColor: 'borderColor',
                        borderBottomStyle: 'solid',
                    }}
                >
                    <Button
                        onClick={onClose}
                        p={0}
                        variant="border"
                        color="text"
                        mr={16}
                        sx={{
                            width: 40,
                            svg: {
                                width: 13,
                                height: 13,
                            },
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <SearchInput />
                </Flex>
            </Box>
            <Box py={3} sx={{ width: '100%' }}>
                <Flex
                    px={24}
                    py={2}
                    sx={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text
                        color="textSecondary"
                        py={4}
                        sx={{
                            maxWidth: 215,
                            textAlign: 'center',
                            fontSize: 2,
                        }}
                    >
                        Search by creator, collectible or collection
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Search;